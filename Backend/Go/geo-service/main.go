package main

import (
	"context"
	"encoding/json"
	"log"
	"math"
	"net/http"
)

type DistanceRequest struct {
	Lat1 float64 `json:"lat1"`
	Lon1 float64 `json:"lon1"`
	Lat2 float64 `json:"lat2"`
	Lon2 float64 `json:"lon2"`
}

type DistanceResponse struct {
	DistanceKm float64 `json:"distance_km"`
}

func haversine(lat1, lon1, lat2, lon2 float64) float64 {
	const R = 6371
	dLat := (lat2 - lat1) * math.Pi / 180
	dLon := (lon2 - lon1) * math.Pi / 180

	a := math.Sin(dLat/2)*math.Sin(dLat/2) +
		math.Cos(lat1*math.Pi/180)*math.Cos(lat2*math.Pi/180)*
			math.Sin(dLon/2)*math.Sin(dLon/2)

	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))
	return R * c
}

func main() {

	conn := connectDB()
	defer conn.Close(context.Background())

	http.HandleFunc("/distance-from-db", func(w http.ResponseWriter, r *http.Request) {

		var req struct {
			FromID int `json:"from_id"`
			ToID   int `json:"to_id"`
		}

		json.NewDecoder(r.Body).Decode(&req)

		var distance float64

		query := `
			SELECT ST_Distance(a.geom, b.geom) / 1000
			FROM locations a, locations b
			WHERE a.id = $1 AND b.id = $2
		`

		err := conn.QueryRow(context.Background(), query, req.FromID, req.ToID).Scan(&distance)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		json.NewEncoder(w).Encode(map[string]float64{
			"distance_km": distance,
		})
	})

	log.Println("Geo-service rodando na porta 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
