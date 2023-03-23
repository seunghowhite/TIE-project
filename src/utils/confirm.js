export const confirm = (msg, handler) => {
  if(window.confirm(msg)){
    handler();
  }
}