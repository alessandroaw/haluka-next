export const capitalizeFirstLetter = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

export const divideEqually = (arr: any[], n: number) => {
  const temp = [...arr];
  const result: Array<Array<any>> = [];

  while (temp.length >= n) {
    const partition = temp.splice(0, n);
    result.push(partition);
  }

  if (temp.length > 0) result.push(temp);

  return result;
};

export const extractContent = (s: string) => {
  const span = document.createElement("span");
  span.innerHTML = s;
  return span.textContent || span.innerText;
};

export const prettyDate = (time: Date) => {
  const d = new Date(time);
  const dd = d.getDate();
  const mm = d.getMonth();
  const yy = d.getFullYear();

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return `${dd} ${months[mm]} ${yy}`;
};

export const prettyDateTime = (time: Date) => {
  const date = prettyDate(time);
  const d = new Date(time.toString());
  const hh = d.getHours();
  const mm = d.getMinutes().toString().padStart(2, "0");

  return `${date} ${hh}:${mm}`;
};

export const getHoursAndMinutes = (time: Date) => {
  const d = new Date(time);
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");

  return `${hh}:${mm}`;
};

export const getImageFileDimension = (file: File) =>
  new Promise((resolve) => {
    const imgUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = function () {
      resolve({
        height: img.height,
        width: img.width,
      });
    };

    img.src = imgUrl;
  });

export const getS3ImageURL = (filename: string) => {
  let folder = "";
  try {
    folder = filename.split("-")[0];
  } catch (err) {
    console.warn(err);
  }
  return `${process.env.NEXT_PUBLIC_AWS_BUCKET}/${folder}/${filename}`;
};

// copy string to clipboard
export const copyToClipboard = (str: string) => {
  navigator.clipboard.writeText(str);
};

export const generateRandomPassword = (): string => {
  const password = Math.random().toString(36).slice(-8);
  return password;
};

export function escapeRegExp(value: string): string {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// get user initials from name
export const getInitials = (name: string) => {
  const names = name.split(" ");
  return names
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// String to HTML Element
export const stringToHTML = (str: string) => {
  var parser = new DOMParser();
  var doc = parser.parseFromString(str, "text/html");
  return doc.body;
};
