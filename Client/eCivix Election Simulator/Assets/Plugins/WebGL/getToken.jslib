mergeInto(LibraryManager.library, {

  getAccessToken: function () {

  	//localStorage.setItem("accessToken", "1");

  	var token = localStorage.getItem('accessToken');
    var bufferSize = lengthBytesUTF8(token) + 1;
    var buffer =  gameInstance.Module._malloc(bufferSize);
    stringToUTF8(token, buffer, bufferSize);

    //var token = localStorage.getItem('accessToken');
    //var buffer = _malloc(lengthBytesUTF8(token) + 1);

    //writeStringToMemory(token, buffer);
    return buffer;
  }
});