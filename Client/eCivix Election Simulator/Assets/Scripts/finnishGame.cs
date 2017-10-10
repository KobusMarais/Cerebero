using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using SimpleJSON;
using System.Text;

public class finnishGame : MonoBehaviour {

    // Use this for initialization

    public Button done;
	private WWW www11;
	public Text position1Name;
	public Text position1Score;
	public Text position2Name;
	public Text position2Score;
	public Text position3Name;
	public Text position3Score;
	public Text position4Name;
	public Text position4Score;
	public Text position5Name;
	public Text position5Score;
	public Text position6Name;
	public Text position6Score;
	public Text position7Name;
	public Text position7Score;
	public Text position8Name;
	public Text position8Score;
	public Text position9Name;
	public Text position9Score;
	public Text position10Name;
	public Text position10Score;
	public Text position11Name;
	public Text position11Score;
	public Text userPosition;

    public GameObject errorBox;
    public Text errorMessage;
    public Button closeError;

    public GameObject loadScreen;
    public GameObject loadText;

    void Start () {

		getHighscores();
        Button btn = done.GetComponent<Button>();
        btn.onClick.AddListener(endGame);

        errorBox.SetActive(false);

        loadScreen.SetActive(false);
        loadText.SetActive(false);

        Button closeErrorbtn = closeError.GetComponent<Button>();
        closeErrorbtn.onClick.AddListener(closeErrorFun);

    }
	
	void endGame () {
        SceneManager.LoadScene("WelcomeScreen");
    }

    void closeErrorFun()
    {
        errorBox.SetActive(false);
    }

    void getHighscores()
	{

		loadHighscores();

        string url = "http://ecivix.org.za/api/endHighscore";

		var requestString = "{\"access_token\":\"" + NewGame.access_token + "\", \"userScore\":\"" + GamePlayButtons.finalScore + "\"}";
		print ("gethighscore: " + requestString);
		byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

		WWWForm form = new WWWForm();

		var headers = form.headers;
		headers["Content-Type"] = "application/json";

		www11 = new WWW (url, pData, headers);

		/*
		while(!www11.isDone)
        {
            loadScreen.SetActive(true);
            loadText.SetActive(true);
        }

		*/

        loadScreen.SetActive(false);
        loadText.SetActive(false);

        StartCoroutine (loadHighscores());
	}

	IEnumerator loadHighscores()
	{
		yield return www11;
		if (!string.IsNullOrEmpty(www11.error))
		{
			errorMessage.text = www11.error;
            errorBox.SetActive(true);
        }
		else
		{
			print(www11.text);
			var jsonObj = JSON.Parse(www11.text);
			int arrayLength = 11;
			//int 
			for (int i = 0; i < arrayLength; i++) {

				switch (i)
				{
				case 0:
					position1Name.text = removeApos(jsonObj [0]["name"].ToString ());
					position1Score.text = removeApos(jsonObj [0]["score"].ToString ());
					break;
				case 1:
					position2Name.text = removeApos(jsonObj [1]["name"].ToString ());
					position2Score.text = removeApos(jsonObj [1]["score"].ToString ());
					break;
				case 2:
					position3Name.text = removeApos(jsonObj [2]["name"].ToString ());
					position3Score.text = removeApos(jsonObj [2]["score"].ToString ());
					break;
				case 3:
					position4Name.text = removeApos(jsonObj [3]["name"].ToString ());
					position4Score.text = removeApos(jsonObj [3]["score"].ToString ());
					break;
				case 4:
					position5Name.text = removeApos(jsonObj [4]["name"].ToString ());
					position5Score.text = removeApos(jsonObj [4]["score"].ToString ());
					break;
				case 5:
					position6Name.text = removeApos(jsonObj [5]["name"].ToString ());
					position6Score.text = removeApos(jsonObj [5]["score"].ToString ());
					break;
				case 6:
					position7Name.text = removeApos(jsonObj [6]["name"].ToString ());
					position7Score.text = removeApos(jsonObj [6]["score"].ToString ());
					break;
				case 7:
					position8Name.text = removeApos(jsonObj [7]["name"].ToString ());
					position8Score.text = removeApos(jsonObj [7]["score"].ToString ());
					break;
				case 8:
					position9Name.text = removeApos(jsonObj [8]["name"].ToString ());
					position9Score.text = removeApos(jsonObj [8]["score"].ToString ());
					break;
				case 9:
					position10Name.text = removeApos(jsonObj [9]["name"].ToString ());
					position10Score.text = removeApos(jsonObj [9]["score"].ToString ());
					break;
				case 10:
					position11Name.text = removeApos(jsonObj [10]["name"].ToString ());
					position11Score.text = removeApos(jsonObj [10]["score"].ToString ());
					userPosition.text = removeApos(jsonObj [10]["position"].ToString ());
					//print (jsonObj ["scoreboard"].ToString());
					break;
			}
		}
	}
}
	string removeApos(string a) {
		return a.Replace('"', ' ');
	}
}