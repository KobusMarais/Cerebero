using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using System;

public class AvatarChoice : MonoBehaviour {
    
    public Image image;

    // Use this for initialization
    void Start () {

        String path = "New_Game_Screen/";
        path += PlayerPrefs.GetString("Avatar");
        
        image.sprite = Resources.Load<Sprite>(path);
    }
	
}
