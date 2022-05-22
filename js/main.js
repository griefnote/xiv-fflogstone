function scrapeLodestone(){
  var character = {
    name: document.querySelector('.frame__chara__name').textContent,
    realm: document.querySelector('.frame__chara__world').textContent.match(/^(\w*)\s+\[(\w*)\]/),
    server: "",
    datacenter: "",
    region: "",
    fflogsid: "",
  }
  //console.log(character);
  return character;
};

async function getFflogsId(character){
    var regionMap = {
      "Aether" : "NA",
      "Crystal" : "NA",
      "Primal" : "NA",
      "Chaos" : "EU",
      "Light" : "EU",
      "Elemental" : "JP",
      "Gaia" : "JP",
      "Mana" : "JP",
    };
    character.server = character.realm[1];
    character.datacenter = character.realm[2];
    character.region = regionMap[character.datacenter];

    var baseurl = 'https://www.fflogs.com:443/v1/rankings/character/';
    var urlParam = encodeURI(character.name) + '/' + character.server + '/' + character.region + '?api_key=' + storedKey;
    //console.log("API Request Parameter : " + urlParam);

    await fetch(baseurl + urlParam)
      .then(res => res.json())
      .then(data => {
          character.fflogsid = data[0].characterID;
        })
      .catch(function(error) {
        console.log(error.message);
        return -1;
      });

    return character.fflogsid;
};

async function addFflogsLinkElement(){
  var url = "https://www.fflogs.com/character/id/";
  var id = await getFflogsId(scrapeLodestone());
  if(id < 1) return;
  url += id;
  //console.log("FFLogs Link URL : " + url);

  var node = document.createElement("a");
  node.setAttribute("id","fflogs-button");
  node.setAttribute("href", url);
  node.setAttribute("target", "_blank");
  node.setAttribute("rel", "noopener");
  node.innerHTML = "FFLogs"

  document.getElementsByClassName('frame__chara__name')[0].appendChild(node);
};

var storedKey;
chrome.storage.sync.get('fflogs_apikey', function(result){
    storedKey = result.fflogs_apikey;
    if (typeof storedKey !== 'undefined') addFflogsLinkElement();
});
