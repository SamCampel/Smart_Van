package main

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
)

func connectDB() *pgx.Conn {

	connStr := "postgres://postgres:1234@localhost:5432/geo_db"

	conn, err := pgx.Connect(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Erro ao fazer conexão no Postgres: %v\n", err)
		os.Exit(1)
	}

	return conn
}
