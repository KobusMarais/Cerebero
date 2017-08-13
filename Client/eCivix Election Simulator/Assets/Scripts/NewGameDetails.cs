using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;

public class NewGameDetails : MonoBehaviour {

    public Button continueButton;
    public InputField partyNameInput;
    private WWW www;

    // public Image image;

    // Use this for initialization
    void Start () {
        
        Button btn = continueButton.GetComponent<Button>();
        btn.onClick.AddListener(StartGame);

       // image.sprite = Resources.Load<Sprite>("avatar1.png");
    }
	
	void StartGame()
    {
        PlayerPrefs.SetString("Player Party", partyNameInput.text);
        SceneManager.LoadScene("MainScreen");
    }

    void fundmid()
    {
        string url = "https://ecivix-testing.herokuapp.com/api/startGame";
        www = new WWW(url);
        StartCoroutine(initialiseGame());
    }

    IEnumerator initialiseGame()
    {
        print("Initialising gameplay variables");

        yield return www;
        print(www.text);

    }

}
