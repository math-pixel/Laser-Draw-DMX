
// the WebSocket instance
var websocket;
var isConnected = false;
// the websocket host location
var wshost = "http://127.0.0.1:9999";

// helper function to send QLC+ API commands
function requestAPI(cmd)
{
  if (isConnected === true)
    websocket.send("QLC+API|" + cmd);
  else
    alert("You must connect to QLC+ WebSocket first!");
}

// helper function to send a QLC+ API with one parameter.
// The specified parameter is not a value, but a CSS object
// from which a value is retrieved (usually a <input> box)
function requestAPIWithParam(cmd, paramObjName)
{
  var obj = document.getElementById(paramObjName);
  if (obj)
  {
    if (isConnected === true)
      websocket.send("QLC+API|" + cmd + "|" + obj.value);
    else
      alert("You must connect to QLC+ WebSocket first!");
  }
}

function requestAPIWith2Params(cmd, paramObjName, param2ObjName)
{
  var obj1 = document.getElementById(paramObjName);
  var obj2 = document.getElementById(param2ObjName);
  if (obj1 && obj2)
  {
    if (isConnected === true)
      websocket.send("QLC+API|" + cmd + "|" + obj1.value + "|" + obj2.value);
    else
      alert("You must connect to QLC+ WebSocket first!");
  }
}

function requestChannelsRange(cmd, uniObjName, addressObjName, rangeObjName)
{
  var uniObj = document.getElementById(uniObjName);
  var addrObj = document.getElementById(addressObjName);
  var rangeObj = document.getElementById(rangeObjName);
  if (uniObj && addrObj && rangeObj)
  {
    if (isConnected === true)
      websocket.send("QLC+API|" + cmd + "|" + uniObj.value + "|" + addrObj.value + "|" + rangeObj.value);
    else
      alert("You must connect to QLC+ WebSocket first!");
  }
}

function setSimpleDeskChannel(addressObjName, channelValueObjName)
{
  var addrObj = document.getElementById(addressObjName);
  var valObj = document.getElementById(channelValueObjName);
  if (addrObj && valObj)
  {

    // console.log("i",addrObj.value, valObj.value)
    if (isConnected === true)
      websocket.send("CH|" + addrObj.value + "|" + valObj.value);
    else
      alert("You must connect to QLC+ WebSocket first!");
  }
}

function mySetSimpleDeskChannel(addressDMX, valueDMX)
{
  console.log("send data channel : ", addressDMX, " value : ", valueDMX)
  if (isConnected === true)
    websocket.send("CH|" + addressDMX + "|" + valueDMX);
  else
    console.log("You must connect to QLC+ WebSocket first!");
  
}

function vcWidgetSetValue(wIDObjName, wValueObjName)
{
  var wObj = document.getElementById(wIDObjName);
  var valObj = document.getElementById(wValueObjName);
  if (wObj && valObj)
  {
    if (isConnected === true)
      websocket.send(wObj.value + "|" + valObj.value);
    else
      alert("You must connect to QLC+ WebSocket first!");
  }
}

function vcCueListControl(clIDObjName, clOpObjName, clStepObjName)
{
  var clObj = document.getElementById(clIDObjName);
  var opObj = document.getElementById(clOpObjName);
  var stepObj = document.getElementById(clStepObjName);
  if (clObj && opObj)
  {
    if (isConnected === true)
    {
      if (opObj.value === "STEP")
        websocket.send(clObj.value + "|" + opObj.value + "|" + stepObj.value);
      else
        websocket.send(clObj.value + "|" + opObj.value);
    }
    else
      alert("You must connect to QLC+ WebSocket first!");
  }
}

function vcFrameControl(frIDObjName, frOperation)
{
  var frObj = document.getElementById(frIDObjName);
  var opObj = document.getElementById(frOperation);

  if (frObj && opObj)
  {
    if (isConnected === true)
    {
        websocket.send(frObj.value + "|" + opObj.value);
    }
    else
      alert("You must connect to QLC+ WebSocket first!");
  }
}

function connectToWebSocket(host) {
  var url = 'ws://' + host + '/qlcplusWS';
  websocket = new WebSocket(url);
  // update the host information
  wshost = "http://" + host;

  websocket.onopen = function(ev) {
    //alert("QLC+ connection successful");
    document.getElementById('connStatus').innerHTML = "<font color=green>Connected</font>";
    isConnected = true;
  };

  websocket.onclose = function(ev) {
    alert("QLC+ connection lost!");
  };

  websocket.onerror = function(ev) {
    alert("QLC+ connection error!");
  };

  // WebSocket message handler. This is where async events
  // will be shown or processed as needed
  websocket.onmessage = function(ev) {
    // Uncomment the following line to display the received message
    //alert(ev.data);

    // Event data is formatted as follows: "QLC+API|API name|arguments"
    // Arguments vary depending on the API called

    var msgParams = ev.data.split('|');

    if (msgParams[0] === "QLC+API")
    {
      if (msgParams[1] === "getFunctionsNumber")
      {
        document.getElementById('getFunctionsNumberBox').innerHTML = msgParams[2];
      }
      // Arguments is an array formatted as follows:
      // Function ID|Function name|Function ID|Function name|...
      else if (msgParams[1] === "getFunctionsList")
      {
        var tableCode = "<table class='apiTable'><tr><th>ID</th><th>Name</th></tr>";
        for (i = 2; i < msgParams.length; i+=2)
        {
            tableCode = tableCode + "<tr><td>" + msgParams[i] + "</td><td>" + msgParams[i + 1] + "</td></tr>";
        }
        tableCode += "</table>";
        document.getElementById('getFunctionsListBox').innerHTML = tableCode;
      }
      else if (msgParams[1] === "getFunctionType")
      {
        document.getElementById('getFunctionTypeBox').innerHTML = msgParams[2];
      }
      else if (msgParams[1] === "getFunctionStatus")
      {
        document.getElementById('getFunctionStatusBox').innerHTML = msgParams[2];
      }
      else if (msgParams[1] === "getWidgetsNumber")
      {
        document.getElementById('getWidgetsNumberBox').innerHTML = msgParams[2];
      }
      // Arguments is an array formatted as follows:
      // Widget ID|Widget name|Widget ID|Widget name|...
      else if (msgParams[1] === "getWidgetsList")
      {
        var tableCode = "<table class='apiTable'><tr><th>ID</th><th>Name</th></tr>";
        for (i = 2; i < msgParams.length; i+=2)
        {
            tableCode = tableCode + "<tr><td>" + msgParams[i] + "</td><td>" + msgParams[i + 1] + "</td></tr>";
        }
        tableCode += "</table>";
        document.getElementById('getWidgetsListBox').innerHTML = tableCode;
      }
      else if (msgParams[1] === "getWidgetType")
      {
        document.getElementById('getWidgetTypeBox').innerHTML = msgParams[2];
      }
      else if (msgParams[1] === "getWidgetStatus")
      {
        var status = msgParams[2];
        if (msgParams[2] === "PLAY")
            status = msgParams[2] + "(Step: " + msgParams[3] + ")";
        document.getElementById('getWidgetStatusBox').innerHTML = status;
      }
      else if (msgParams[1] === "getChannelsValues")
      {
        var tableCode = "<table class='apiTable'><tr><th>Index</th><th>Value</th><th>Type</th></tr>";
        for (i = 2; i < msgParams.length; i+=3)
        {
            tableCode = tableCode + "<tr><td>" + msgParams[i] + "</td><td>" + msgParams[i + 1] + "</td><td>" + msgParams[i + 2] + "</td></tr>";
        }
        tableCode += "</table>";
        document.getElementById('requestChannelsRangeBox').innerHTML = tableCode;
      }
    }
  };
};

function loadProject () {
  var formAction = wshost + "/loadProject";
  document.getElementById('lpForm').action = formAction;
}
