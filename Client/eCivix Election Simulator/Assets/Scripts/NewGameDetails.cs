using System.Collections;
using System.Collections.Generic;
using System;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.SceneManagement;
using System.Text;

public class NewGameDetails : MonoBehaviour
{

    public Button continueButton;
    public InputField partyNameInput;

    public Button normalDif;
    public Button easyDif;
    public Button hardDif;

    public GameObject loadScreen;
    public GameObject loadText;

    public Button avatar1;
    public Button avatar2;
    public Button avatar3;
    public Button avatar4;
    public Button avatar5;
    public Button avatar6;
    public Button avatar7;
    public Button avatar8;
    public Button avatar9;
    public Button avatar10;

    String difData;
    WWW www;
    bool flag;

    public static String newGameJson;

    // Use this for initialization
    void Start()
    {

        flag = false;
        difData = "";

        loadScreen.SetActive(false);
        loadText.SetActive(false);

        Button btn = continueButton.GetComponent<Button>();
        btn.onClick.AddListener(StartGame);

        Button btn1 = easyDif.GetComponent<Button>();
        btn1.onClick.AddListener(easyDifficulty);

        Button btn2 = normalDif.GetComponent<Button>();
        btn2.onClick.AddListener(normalDifficulty);

        Button btn3 = hardDif.GetComponent<Button>();
        btn3.onClick.AddListener(hardDifficulty);



        Button avt1 = avatar1.GetComponent<Button>();
        avt1.onClick.AddListener(Avatar1);

        Button avt2 = avatar2.GetComponent<Button>();
        avt2.onClick.AddListener(Avatar2);

        Button avt3 = avatar3.GetComponent<Button>();
        avt3.onClick.AddListener(Avatar3);

        Button avt4 = avatar4.GetComponent<Button>();
        avt4.onClick.AddListener(Avatar4);

        Button avt5 = avatar5.GetComponent<Button>();
        avt5.onClick.AddListener(Avatar5);

        Button avt6 = avatar6.GetComponent<Button>();
        avt6.onClick.AddListener(Avatar6);

        Button avt7 = avatar7.GetComponent<Button>();
        avt7.onClick.AddListener(Avatar7);

        Button avt8 = avatar8.GetComponent<Button>();
        avt8.onClick.AddListener(Avatar8);

        Button avt9 = avatar9.GetComponent<Button>();
        avt9.onClick.AddListener(Avatar9);

        Button avt10 = avatar10.GetComponent<Button>();
        avt10.onClick.AddListener(Avatar10);

    }

    void StartGame()
    {
        if (partyNameInput.text == "" || difData == "" || !flag)
        {
            Debug.Log("One or more empty fields");
        }
        else
        {
            loadScreen.SetActive(true);
            loadText.SetActive(true);

            Upload();
            string url = "http://ecivix.org.za/api/startGame";

            var requestString = "{\"access_token\":\"123abc\", \"difficulty\":" + difData + "}";

            byte[] pData = Encoding.ASCII.GetBytes(requestString.ToCharArray());

            www = new WWW(url, pData);
            StartCoroutine(Upload());

            PlayerPrefs.SetString("Player Party", partyNameInput.text);

        }

    }

    IEnumerator delayLoading()
    {
        yield return new WaitForSeconds(2);

        SceneManager.LoadScene("IssuesSelection");
    }


    IEnumerator Upload()
    {
        yield return www;

       // print(www.text);

        if (!string.IsNullOrEmpty(www.error))
        {
            Debug.Log(www.error);

            loadScreen.SetActive(false);
            loadText.SetActive(false);
        }
        else
        {
            newGameJson = www.text;
            StartCoroutine(delayLoading());
            
        }
    }

    void easyDifficulty()
    {
        difData = "easy";
    }

    void normalDifficulty()
    {
        difData = "normal";
    }

    void hardDifficulty()
    {
        difData = "hard";
    }

    void Avatar1()
    {
        PlayerPrefs.SetString("Avatar", "avatar1");
        flag = true;
    }
    void Avatar2()
    {
        PlayerPrefs.SetString("Avatar", "avatar2");
        flag = true;
    }
    void Avatar3()
    {
        PlayerPrefs.SetString("Avatar", "avatar3");
        flag = true;
    }
    void Avatar4()
    {
        PlayerPrefs.SetString("Avatar", "avatar4");
        flag = true;
    }
    void Avatar5()
    {
        PlayerPrefs.SetString("Avatar", "avatar5");
        flag = true;
    }
    void Avatar6()
    {
        PlayerPrefs.SetString("Avatar", "avatar6");
        flag = true;
    }
    void Avatar7()
    {
        PlayerPrefs.SetString("Avatar", "avatar7");
        flag = true;
    }
    void Avatar8()
    {
        PlayerPrefs.SetString("Avatar", "avatar8");
        flag = true;
    }
    void Avatar9()
    {
        PlayerPrefs.SetString("Avatar", "avatar9");
        flag = true;
    }
    void Avatar10()
    {
        PlayerPrefs.SetString("Avatar", "avatar10");
        flag = true;
    }
}
