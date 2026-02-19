function trimId(id) {
    if (id.includes("id")) {
        return id.replace("id", "");
    }

    return id;
}

export default trimId;