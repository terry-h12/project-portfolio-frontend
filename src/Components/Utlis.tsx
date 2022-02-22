export function AddHTTP(site: string) {
  let pattern = /^((http|https|ftp):\/\/)/;

  if(!pattern.test(site)) {
    site = "http://" + site;
  }
  return site
}
