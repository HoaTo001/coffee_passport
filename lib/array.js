export function nextItem(index, length) {
    console.log((index+1)%length)
    return ((index+length+1)%length)
}

export function prevItem(index, length) {
    console.log((index-1)%length)
    return ((index+length-1)%length)
}