using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine;
using UnityEngine.SceneManagement;
using SimpleJSON;
using System.Text;

public class PanelScript : MonoBehaviour
{

    public Button menuButton;
    public Button closeMenu;

    private WWW www10;
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


    public Button leaderBoardButton;
    public Button soundButton;
    public Button exitButton;
    public Button restartButton;

    public Button helpButton;

    public GameObject menu;
    public GameObject map;
    public GameObject leaderBoard;

    public GameObject errorBox;
    public Text errorMessage;
    public Button closeError;

    // Use this for initialization
    void Start()
    {

        menu.SetActive(false);
        errorBox.SetActive(false);
        leaderBoard.SetActive(false);
        map.SetActive(false);

        Button btn1 = menuButton.GetComponent<Button>();
        btn1.onClick.AddListener(openPanel);

        Button btn2 = closeMenu.GetComponent<Button>();
        btn2.onClick.AddListener(closePanel);

        Button btn3 = leaderBoardButton.GetComponent<Button>();
        btn3.onClick.AddListener(inGameleaderBoard);

        Button btn4 = soundButton.GetComponent<Button>();
        btn4.onClick.AddListener(sound);

        Button btn5 = exitButton.GetComponent<Button>();
        btn5.onClick.AddListener(exitGame);

        Button btn6 = restartButton.GetComponent<Button>();
        btn6.onClick.AddListener(restartGame);

        Button btn7 = helpButton.GetComponent<Button>();
        btn7.onClick.AddListener(help);

        


    }

    void openPanel()
    {
        //OPEN MENU
        menu.SetActive(true);
        map.SetActive(true);

    }

    void closePanel()
    {
        //CLOSE MENU

        menu.SetActive(false);
        map.SetActive(false);

        // NCButton.interactable = true;
    }

    void inGameleaderBoard()
    {
        //SAVE GAME

        //print("You have clicked on the save game button");

        //menu.SetActive(false);
        //map.SetActive(true);
        getHighscores();
        leaderBoard.SetActive(true);
    }


    void restartGame()
    {
        //RESTART GAME

        //print("You have clicked on the restart game button");

        //menu.SetActive(false);
        //map.SetActive(true);
        SceneManager.LoadScene("NewGameScreen");
    }

    void sound()
    {
        //SOUND ON/OFF

        //print("You have clicked on the sound button");

        //menu.SetActive(false);
        //map.SetActive(true);
    }

    void help()
    {
        //HELP

        //print("You have clicked on the help button");

        //menu.SetActive(false);
        //map.SetActive(true);
    }

    void exitGame()
    {
        //EXIT APPLICATION

        //menu.SetActive(false);
        //map.SetActive(true);

        Application.Quit();
    }

    void getHighscores()
    {

        loadHighscores();

        string url = "http://ecivix.org.za/api/getHighscoreBoard";

		www10 = new WWW(url);


        StartCoroutine(loadHighscores());
    }

    IEnumerator loadHighscores()
    {
		yield return www10;
		if (!string.IsNullOrEmpty(www10.error))
        {
			errorMessage.text = www10.error;
            errorBox.SetActive(true);
        }
        else
        {
			//print(www10.text);
			var jsonObj = JSON.Parse(www10.text);
            int arrayLength = 11;
            for (int i = 0; i < arrayLength; i++)
            {

                switch (i)
                {
                    case 0:
                        position1Name.text = removeApos(jsonObj[0]["name"].ToString());
                        position1Score.text = removeApos(jsonObj[0]["score"].ToString());
                        break;
                    case 1:
                        position2Name.text = removeApos(jsonObj[1]["name"].ToString());
                        position2Score.text = removeApos(jsonObj[1]["score"].ToString());
                        break;
                    case 2:
                        position3Name.text = removeApos(jsonObj[2]["name"].ToString());
                        position3Score.text = removeApos(jsonObj[2]["score"].ToString());
                        break;
                    case 3:
                        position4Name.text = removeApos(jsonObj[3]["name"].ToString());
                        position4Score.text = removeApos(jsonObj[3]["score"].ToString());
                        break;
                    case 4:
                        position5Name.text = removeApos(jsonObj[4]["name"].ToString());
                        position5Score.text = removeApos(jsonObj[4]["score"].ToString());
                        break;
                    case 5:
                        position6Name.text = removeApos(jsonObj[5]["name"].ToString());
                        position6Score.text = removeApos(jsonObj[5]["score"].ToString());
                        break;
                    case 6:
                        position7Name.text = removeApos(jsonObj[6]["name"].ToString());
                        position7Score.text = removeApos(jsonObj[6]["score"].ToString());
                        break;
                    case 7:
                        position8Name.text = removeApos(jsonObj[7]["name"].ToString());
                        position8Score.text = removeApos(jsonObj[7]["score"].ToString());
                        break;
                    case 8:
                        position9Name.text = removeApos(jsonObj[8]["name"].ToString());
                        position9Score.text = removeApos(jsonObj[8]["score"].ToString());
                        break;
                    case 9:
                        position10Name.text = removeApos(jsonObj[9]["name"].ToString());
                        position10Score.text = removeApos(jsonObj[9]["score"].ToString());
                        break;
                }
            }
            
        }
    }

    string removeApos(string a)
    {
        return a.Replace('"', ' ');
    }
}
