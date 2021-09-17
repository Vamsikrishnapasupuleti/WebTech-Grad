// this assumes that in the html that there is an Element named "dynamic"
// note the order of the css files matters
let files = (new URLSearchParams(document.location.search).get("css") );
if (files != null) files.split(" ").forEach(file=>{ addLink(file); });

function addLink(file){
  if (file =="") return;
  // link the csss file
  const fileref=document.createElement("link");
  fileref.setAttribute("rel", "stylesheet");
  //fileref.setAttribute("type", "text/css");
  fileref.setAttribute("href", file);
  document.getElementsByTagName("head")[0].appendChild(fileref);
  
  // show what was added and give access to the css file
  const info = htmlToElement(`<li>&lt;link rel="stylesheet" href="<a href="${file}" target="_blank">${file}</a>"&gt;</li>`);
  document.getElementById("dynamic").appendChild(info);
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
