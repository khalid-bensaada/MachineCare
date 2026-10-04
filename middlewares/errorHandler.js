function notFound(req ,res ,next){
    res.status(404).json({ message: "Route not found" });
}

function errorHandler(err ,req ,res ,next){

    if (err.type === "entity.parse.failed") {
        return res.status(400).json({ message: "Invalid JSON body" });
    }

    if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid id format" });
    }

    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }

    if (err.code === 11000) {
        return res.status(409).json({ message: "Duplicate value" });
    }

    res.status(err.status || 500).json({ message: "Internal server error", error: err.message });
}

module.exports = { notFound, errorHandler };