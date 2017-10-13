mergeInto(LibraryManager.library, {

  getAccessToken: function () {

    var token = localStorage.getItem('accessToken');
    var buffer = _malloc(lengthBytesUTF8(token) + 1);

    writeStringToMemory(token, buffer);
    return buffer;
  }
});