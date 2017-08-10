using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine;

public class PanelScript : MonoBehaviour {

    public Button menuButton;
    public Button closeMenu;

    public Button saveButton;
    public Button soundButton;
    public Button exitButton;
    public Button restartButton;

    public Button helpButton;

    public GameObject menu;
    public GameObject map;

    // Use this for initialization
    void Start () {

        menu.SetActive(false);

        Button btn1 = menuButton.GetComponent<Button>();
        btn1.onClick.AddListener(openPanel);

        Button btn2 = closeMenu.GetComponent<Button>();
        btn2.onClick.AddListener(closePanel);

        Button btn3 = saveButton.GetComponent<Button>();
        btn3.onClick.AddListener(saveGame);

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
        map.SetActive(false);
    }

    void closePanel()   
    {
        //CLOSE MENU

        menu.SetActive(false);
        map.SetActive(true);
    }

    void saveGame() 
    {
        //SAVE GAME

        //print("You have clicked on the save game button");
        
        //menu.SetActive(false);
        //map.SetActive(true);
    }

    void restartGame()  
    {
        //RESTART GAME

        //print("You have clicked on the restart game button");

        //menu.SetActive(false);
        //map.SetActive(true);

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
}
