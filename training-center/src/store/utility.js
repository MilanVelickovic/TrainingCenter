const updateObject = (oldObject, updatedValue) => {
    return {
        ...oldObject,
        ...updatedValue
    }
}

export default updateObject;