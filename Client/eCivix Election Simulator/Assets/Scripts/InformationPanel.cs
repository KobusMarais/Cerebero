using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class InformationPanel : MonoBehaviour {

    public Button closeButton;

    public GameObject Panel;

    void Start()
    {
        Button btn2 = closeButton.GetComponent<Button>();
        btn2.onClick.AddListener(closePanel);

    }

    void closePanel()
    {
        //CLOSE PANEL

        Panel.SetActive(false);
    }
}
