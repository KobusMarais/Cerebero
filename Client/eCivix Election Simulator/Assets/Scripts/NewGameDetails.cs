using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;

public class NewGameDetails : MonoBehaviour {

    public Button continueButton;

	// Use this for initialization
	void Start () {

        Button btn = continueButton.GetComponent<Button>();
        btn.onClick.AddListener(StartGame);
    }
	
	void StartGame()
    {
        SceneManager.LoadScene("MainScreen");
    }
}
