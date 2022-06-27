export function addToCache(resume) {
  localStorage.removeItem("current");
  localStorage.setItem("current", JSON.stringify(resume));
}

export function loadResumeFromCache() {
  const res = localStorage.getItem("current");
  return JSON.parse(res);
}

export async function saveFile(data) {
  const newHandle = await window.showSaveFilePicker();

  // create a FileSystemWritableFileStream to write to
  const writableStream = await newHandle.createWritable();

  // write our file
  await writableStream.write(JSON.stringify(data));

  // close the file and write the contents to disk.
  await writableStream.close();

  window.alert("File saved successfully!");
}
