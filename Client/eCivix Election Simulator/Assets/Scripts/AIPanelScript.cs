using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AIPanelScript : MonoBehaviour {

    public Button openButton;
    public Button closeButton;
    
    public GameObject AI;

    // Use this for initialization
    void Start()
    {
        AI.SetActive(false);

        Button btn1 = openButton.GetComponent<Button>();
        btn1.onClick.AddListener(openPanel);

        Button btn2 = closeButton.GetComponent<Button>();
        btn2.onClick.AddListener(closePanel);

    }

    void openPanel()
    {
        //OPEN MENU

        AI.SetActive(true);
    }

    void closePanel()
    {
        //CLOSE MENU

        AI.SetActive(false);
    }
}
