export function removeDots(input: string) {
    return input.replace(/\./g, '');
  }

export function toLowerCase(input: string) {
    return input.toLowerCase();
}

export function splitReviews(input: string | undefined) {
  if(typeof input === 'string')
    return input.split("/");
  else
    return(["Mauris malesuada nisi sit amet augue","Mauris malesuada nisi sit amet augue"]);
}
