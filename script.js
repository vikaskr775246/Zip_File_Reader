const fileInput = document.getElementById('file');
// console.log(fileInput);
const model = (() => {
    return {
        getEntries(file, options) {
            return (new zip.ZipReader(new zip.BlobReader(file))).getEntries(options);
        },
        async getURL(entry, options) {
            return URL.createObjectURL(await entry.getData(new zip.BlobWriter(), options));
        }
    };
})();
let filepath;
fileInput.onchange = (e) => {
    console.log(e);
    filepath = fileInput.files[0];
    entries = model.getEntries(filepath);
    entries.then((res) => {
        getFiles(res);
    }).catch((error) => alert(error))
}
const ul = document.querySelector('ul');
console.log(ul)
function getFiles(DataList) {
    DataList.forEach((filesname, idx) => {
        // console.log(filesname.filename);
        // console.log(filesname);
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.innerText = filesname.filename;
        a.setAttribute('download', `${filesname.filename}`);
        li.appendChild(a);
        ul.appendChild(li);
        let x = model.getURL(filesname)
        x.then(res => a.href = `${res}`).catch(error => alert(error))
    });
}