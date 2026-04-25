import json
import re

STRIP = [
    "street",
    "avenue",
    "boulevard",
    "drive",
    "road",
    "st",
    "ave",
    "blvd",
    "dr",
    "rd",
    "the",
    "station",
    "inbound",
    "outbound",
    "ib",
    "ob",
    "terminal",
    "ter",
    "way",
]

with open("scripts/muni_stops_clean.json") as f:
    stops = json.load(f)

with open("scripts/muni_metro_todo.json") as f:
    todo = json.load(f)


def normalize(name):
    name = name.lower()
    for word in STRIP:
        name = re.sub(rf"\b{word}\b", "", name)
    name = re.sub(r"\s+", " ", name)
    return name.strip()


def find_match(stops, toMatch):
    for i in stops:
        station = i["name"]
        a = normalize(station)
        b = normalize(toMatch)
        if a == b:
            res = {"name": toMatch, "lat": i["lat"], "lon": i["lon"]}
            return res
    return None


def find_matches(stops, todo):
    results = []
    for station in todo:
        match = find_match(stops, station)
        if match:
            results.append(match)
    results.sort(key=lambda r: r["name"])
    return results


def to_geojson_features(results):
    features = []
    for r in results:
        features.append(
            {
                "type": "Feature",
                "properties": {"name": r["name"], "type": 0},
                "geometry": {"type": "Point", "coordinates": [r["lon"], r["lat"]]},
            }
        )
    return features


results = find_matches(stops, todo)
print([r["name"] for r in results])
print(f"Results Length: {len(results)}")
print(json.dumps(to_geojson_features(results), indent=2))

matched_names = {r["name"] for r in results}
remaining = [s for s in todo if s not in matched_names]
with open("scripts/muni_metro_todo.json", "w") as f:
    json.dump(remaining, f, indent=2)
print(f"{len(remaining)} remaining in todo")
