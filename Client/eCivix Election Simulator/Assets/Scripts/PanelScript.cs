using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine;
using UnityEngine.SceneManagement;
using SimpleJSON;
using System.Text;

public class PanelScript : MonoBehaviour {

    public Button menuButton;
    public Button closeMenu;
    

    public Button leaderboardButton;
    public Button exitButton;
    public Button restartButton;

    public Button helpButton;

    public GameObject menu;
    public GameObject map;
    public GameObject leaderBoard;

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



    // Use this for initialization
    void Start () {

        menu.SetActive(false);
        leaderBoard.SetActive(false);
        map.SetActive(false);

        Button btn1 = menuButton.GetComponent<Button>();
        btn1.onClick.AddListener(openPanel);

        Button btn2 = closeMenu.GetComponent<Button>();
        btn2.onClick.AddListener(closePanel);

        Button btn3 = leaderboardButton.GetComponent<Button>();
        btn3.onClick.AddListener(leaderboard);
        

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

    void leaderboard() 
    {
        //SAVE GAME

        //print("You have clicked on the save game button");

        //menu.SetActive(false);
        //map.SetActive(true);

        leaderBoard.SetActive(true);
        getHighscores();


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
        print("Loading highscore board");

        loadHighscores();
        string url = "http://ecivix.org.za/api/endHighScore";

        var requestString = "{'access_token':'123abc','userScore':'20'}";

        byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

        www = new WWW(url, pData);
        StartCoroutine(loadHighscores());
    }

    IEnumerator loadHighscores()
    {
        yield return www;
        if (!string.IsNullOrEmpty(www.error))
        {
            Debug.Log(www.error);
            print(www.error);
        }
        else
        {
            //print(www.text);
            var jsonObj = JSON.Parse(www.text);
            int arrayLength = jsonObj["scoreboard"].Count;
            for (int i = 0; i < arrayLength; i++)
            {

                switch (i)
                {
                    case 0:
                        position1Name.text = removeApos(jsonObj["scoreboard"][0][0]["name"].ToString());
                        position1Score.text = removeApos(jsonObj["scoreboard"][0][0]["score"].ToString());
                        break;
                    case 1:
                        position2Name.text = removeApos(jsonObj["scoreboard"][1][0]["name"].ToString());
                        position2Score.text = removeApos(jsonObj["scoreboard"][1][0]["score"].ToString());
                        break;
                    case 2:
                        position3Name.text = removeApos(jsonObj["scoreboard"][2][0]["name"].ToString());
                        position3Score.text = removeApos(jsonObj["scoreboard"][2][0]["score"].ToString());
                        break;
                    case 3:
                        position4Name.text = removeApos(jsonObj["scoreboard"][3][0]["name"].ToString());
                        position4Score.text = removeApos(jsonObj["scoreboard"][3][0]["score"].ToString());
                        break;
                    case 4:
                        position5Name.text = removeApos(jsonObj["scoreboard"][4][0]["name"].ToString());
                        position5Score.text = removeApos(jsonObj["scoreboard"][4][0]["score"].ToString());
                        break;
                    case 5:
                        position6Name.text = removeApos(jsonObj["scoreboard"][5][0]["name"].ToString());
                        position6Score.text = removeApos(jsonObj["scoreboard"][5][0]["score"].ToString());
                        break;
                    case 6:
                        position7Name.text = removeApos(jsonObj["scoreboard"][6][0]["name"].ToString());
                        position7Score.text = removeApos(jsonObj["scoreboard"][6][0]["score"].ToString());
                        break;
                    case 7:
                        position8Name.text = removeApos(jsonObj["scoreboard"][7][0]["name"].ToString());
                        position8Score.text = removeApos(jsonObj["scoreboard"][7][0]["score"].ToString());
                        break;
                    case 8:
                        position9Name.text = removeApos(jsonObj["scoreboard"][8][0]["name"].ToString());
                        position9Score.text = removeApos(jsonObj["scoreboard"][8][0]["score"].ToString());
                        break;
                    case 9:
                        position10Name.text = removeApos(jsonObj["scoreboard"][9][0]["name"].ToString());
                        position10Score.text = removeApos(jsonObj["scoreboard"][9][0]["score"].ToString());
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
