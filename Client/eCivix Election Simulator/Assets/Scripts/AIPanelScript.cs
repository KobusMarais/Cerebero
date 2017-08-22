using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class AIPanelScript : MonoBehaviour {
    
    public Button closeButton;
    
    public GameObject AI;

    // Use this for initialization
    void Start()
    {
        AI.SetActive(true);

        Button btn2 = closeButton.GetComponent<Button>();
        btn2.onClick.AddListener(closePanel);

    }
   

    void closePanel()
    {
        //CLOSE MENU

        AI.SetActive(false);
    }
}
