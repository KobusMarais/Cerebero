using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MenuButton : MonoBehaviour
{

    public Button menuButton;

    // Use this for initialization
    void Start()
    {
        Button btn = menuButton.GetComponent<Button>();
        btn.onClick.AddListener(Exit);
    }

    void Exit()
    {
        Application.Quit();
    }

    // Update is called once per frame
    void Update()
    {

    }
}
