using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;

public class PartyName : MonoBehaviour {

    Text partyName;

	// Use this for initialization
	void Start () {

        partyName = GetComponent<Text>();
        partyName.text = PlayerPrefs.GetString("Player Party");
    }
	
}
