export  const formatGeoJson = (data) => {
    let geoJson = {
        type: "FeatureCollection",
        features: [],
    };
    data.forEach((item) => {
        let feature = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [parseFloat(item.longitude), parseFloat(item.latitude)],
            },
            properties: {
                id: item.id,
                description: item.address,
                formAdvertising: item.formAdvertising.name,
                locationTypes: item.locationTypes.name,
                zone: item.zone,
                full_address: `${item.address}, ${item.ward.name}, ${item.district.name}`,
            },
        };
        geoJson.features.push(feature);
    });

    return geoJson;
}
