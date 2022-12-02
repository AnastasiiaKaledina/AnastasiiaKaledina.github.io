export const required = (value) => {
    if (value) { 
        return undefined; 
    }
    return "Required";
}


export const maxLength = (max) => (value) => { 
    if (value.length > max) return `Max symbols ${max}`;
    return undefined;
}