import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const { name_driver, email, cpf, phone, password } = body;

    // Validate required fields
    if (!name_driver || !email || !cpf || !password) {
      return new Response(JSON.stringify({
        message: "Campos obrigatorios: nome, email, cpf e senha"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ message: "Formato de email invalido" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Validate CPF format (11 digits)
    const cpfClean = cpf.replace(/\D/g, '');
    if (cpfClean.length !== 11) {
      return new Response(JSON.stringify({ message: "CPF deve ter 11 digitos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // In a real application, you would save to a database here
    // For demo purposes, we'll just return success

    return new Response(JSON.stringify({
      message: "Motorista cadastrado com sucesso! Faca login para continuar.",
      data: {
        id: Date.now().toString(),
        name: name_driver,
        email,
        userType: "driver"
      }
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Erro ao processar requisicao" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config: Config = {
  path: "/api/drivers"
};
