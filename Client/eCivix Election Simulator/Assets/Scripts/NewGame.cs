using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;

public class NewGame : MonoBehaviour {

    void Start()
    {
        Button btn = GetComponent<Button>();
        btn.onClick.AddListener(TaskOnClick);
    }

    void TaskOnClick()
    {
        SceneManager.LoadScene("NewGameScreen");
    }

    void fundmid()
    {
        collectFunds();
        string url = "https://ecivix-testing.herokuapp.com/api/getFunds";
        www = new WWW(url);
        StartCoroutine(collectFunds());
    }

    IEnumerator collectFunds()
    {
        print("You have clicked on the collect funds button");

        yield return www;
        print(www.text);

    }
}
