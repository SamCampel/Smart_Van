import type { Context, Config } from "@netlify/functions";

// In-memory user storage (for demo purposes)
// In production, use Netlify Blobs or a database
const users: Map<string, { email: string; password: string; name: string; cpf: string; phone: string; userType: string }> = new Map();

// Add a demo user for testing
users.set("demo@example.com", {
  email: "demo@example.com",
  password: "demo123",
  name: "Usuario Demo",
  cpf: "12345678900",
  phone: "11999999999",
  userType: "parent"
});

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const { email, password, userType } = body;

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email e senha sao obrigatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Check user in memory storage
    const user = users.get(email);

    if (!user || user.password !== password) {
      return new Response(JSON.stringify({ message: "Email ou senha incorretos" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

    return new Response(JSON.stringify({
      message: "Login realizado com sucesso",
      data: {
        token,
        user: {
          name: user.name,
          email: user.email,
          userType: user.userType
        }
      }
    }), {
      status: 200,
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
  path: "/api/login"
};
