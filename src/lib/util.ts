function isEmptyObject(opt: Object): boolean {
    if (JSON.stringify(opt) === "{}") {
        return false;
    }
    return true;
}
export {isEmptyObject};
