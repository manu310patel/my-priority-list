export const generateID = () => {
  let result = "";
  let input_length = 5;
  let chars =
    "[@678^#(ABC,F3qr.sIJKN_+}{:OPQRghi)jDEklm:~noGH=2pL*$Mtuvwx<STU1>5VW`XYZa4bcd&efyz09]";
  for (let i = 0; i < input_length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const sortList = (a, b) => {
  return a.isCompleted > b.isCompleted
    ? 1
    : b.isCompleted > a.isCompleted
    ? -1
    : 0;
};
