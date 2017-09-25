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
	private WWW www;
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

    void Start () {

		getHighscores();
        Button btn = done.GetComponent<Button>();
        btn.onClick.AddListener(endGame);

        errorBox.SetActive(false);

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
			string url = "http://ecivix.org.za/api/endHighScore";

			var requestString = "{'access_token':'123abc','userScore':'20'}";

			byte[] pData = Encoding.ASCII.GetBytes (requestString.ToCharArray ());

			www = new WWW (url, pData);
			StartCoroutine (loadHighscores());
	}

	IEnumerator loadHighscores()
	{
		yield return www;
		if (!string.IsNullOrEmpty(www.error))
		{
            errorMessage.text = www.error;
            errorBox.SetActive(true);
        }
		else
		{
			//print(www.text);
			var jsonObj = JSON.Parse(www.text);
			int arrayLength = jsonObj ["scoreboard"].Count;
			for (int i = 0; i < arrayLength; i++) {

				switch (i)
				{
				case 0:
					position1Name.text = removeApos(jsonObj ["scoreboard"][0][0]["name"].ToString ());
					position1Score.text = removeApos(jsonObj ["scoreboard"][0][0]["score"].ToString ());
					break;
				case 1:
					position2Name.text = removeApos(jsonObj ["scoreboard"][1][0]["name"].ToString ());
					position2Score.text = removeApos(jsonObj ["scoreboard"][1][0]["score"].ToString ());
					break;
				case 2:
					position3Name.text = removeApos(jsonObj ["scoreboard"][2][0]["name"].ToString ());
					position3Score.text = removeApos(jsonObj ["scoreboard"][2][0]["score"].ToString ());
					break;
				case 3:
					position4Name.text = removeApos(jsonObj ["scoreboard"][3][0]["name"].ToString ());
					position4Score.text = removeApos(jsonObj ["scoreboard"][3][0]["score"].ToString ());
					break;
				case 4:
					position5Name.text = removeApos(jsonObj ["scoreboard"][4][0]["name"].ToString ());
					position5Score.text = removeApos(jsonObj ["scoreboard"][4][0]["score"].ToString ());
					break;
				case 5:
					position6Name.text = removeApos(jsonObj ["scoreboard"][5][0]["name"].ToString ());
					position6Score.text = removeApos(jsonObj ["scoreboard"][5][0]["score"].ToString ());
					break;
				case 6:
					position7Name.text = removeApos(jsonObj ["scoreboard"][6][0]["name"].ToString ());
					position7Score.text = removeApos(jsonObj ["scoreboard"][6][0]["score"].ToString ());
					break;
				case 7:
					position8Name.text = removeApos(jsonObj ["scoreboard"][7][0]["name"].ToString ());
					position8Score.text = removeApos(jsonObj ["scoreboard"][7][0]["score"].ToString ());
					break;
				case 8:
					position9Name.text = removeApos(jsonObj ["scoreboard"][8][0]["name"].ToString ());
					position9Score.text = removeApos(jsonObj ["scoreboard"][8][0]["score"].ToString ());
					break;
				case 9:
					position10Name.text = removeApos(jsonObj ["scoreboard"][9][0]["name"].ToString ());
					position10Score.text = removeApos(jsonObj ["scoreboard"][9][0]["score"].ToString ());
					break;
				case 10:
					position11Name.text = removeApos(jsonObj ["scoreboard"][10][0]["name"].ToString ());
					position11Score.text = removeApos(jsonObj ["scoreboard"][10][0]["score"].ToString ());
					userPosition.text = removeApos(jsonObj ["scoreboard"][10][0]["position"].ToString ());
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