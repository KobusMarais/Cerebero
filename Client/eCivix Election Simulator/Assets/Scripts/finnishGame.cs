using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class finnishGame : MonoBehaviour {

    // Use this for initialization

    public Button done;
    void Start () {
        Button btn = done.GetComponent<Button>();
        btn.onClick.AddListener(endGame);
    }
	
	// Update is called once per frame
	void endGame () {
        SceneManager.LoadScene("WelcomeScreen");
    }
}
