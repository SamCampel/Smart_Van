package main

import (
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

	http.HandleFunc("/distance", func(w http.ResponseWriter, r *http.Request) {
		var req DistanceRequest
		json.NewDecoder(r.Body).Decode(&req)

		dist := haversine(req.Lat1, req.Lon1, req.Lat2, req.Lon2)
		resp := DistanceResponse{DistanceKm: dist}

		json.NewEncoder(w).Encode(resp)

	})

	log.Println("Starting geo-service on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
