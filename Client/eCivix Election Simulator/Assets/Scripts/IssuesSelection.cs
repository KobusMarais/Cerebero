using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using SimpleJSON;
using System.Text;

public class IssuesSelection : MonoBehaviour {

    public Button start;
    public GameObject loadScreen;
    public GameObject loadText;
	private WWW www;
	public static List<string> selectedIssues = new List<string> ();

	private GameObject[] issueToggleArray;

    public GameObject errorBox;
    public Text errorMessage;
    public Button closeError;

    public Text countText;

    public Button closeExtraInfPanel;
    public Text extraInfoPanelText;
    public GameObject containerPanel;



    //	public Text issue1;
    //	public Text issue2;
    //	public Text issue3;
    //	public Text issue4;
    //	public Text issue5;
    //	public Text issue6;
    //	public Text issue7;
    //	public Text issue8;
    //	public Text issue9;
    //	public Text issue10;
    //	public Text issue11;
    //	public Text issue12;
    //	public Text issue13;
    //	public Text issue14;
    //	public Text issue15;
    //	public Text issue16;
    //	public Text issue17;
    //	public Text issue18;
    //	public Text issue19;
    //	public Text issue20;
    //	public Text issue21;
    //	public Text issue22;
    //	public Text issue23;

    void Start () {

        containerPanel.SetActive(true);

        Button closeExtraInfPanelbtn = closeExtraInfPanel.GetComponent<Button>();
        closeExtraInfPanelbtn.onClick.AddListener(closeExtraInfPanelFun);

        issueToggleArray = GameObject.FindGameObjectsWithTag("Issue");
		getIssues ();

        Button btn = start.GetComponent<Button>();
        btn.onClick.AddListener(SelectIssues);

        

        errorBox.SetActive(false);

        Button closeErrorbtn = closeError.GetComponent<Button>();
        closeErrorbtn.onClick.AddListener(closeErrorFun);

        countText.text = "0";
    }

    void closeErrorFun()
    {
        errorBox.SetActive(false);
    }

    void closeExtraInfPanelFun()
    {
        containerPanel.SetActive(false);
    }

    IEnumerator delayLoading()
    {
        yield return new WaitForSeconds(2);

        SceneManager.LoadScene("StanceSelection");
    }

    void Update()
    {
        int count = 0;
        
        foreach (var issue in issueToggleArray)
        {
            if (issue.GetComponentInChildren<Toggle>().isOn)
            {
                count++;
                countText.text = count.ToString();

                if(count < 10)
                {
                    countText.color = Color.yellow;
                }
                else if(count == 10)
                {
                    countText.color = Color.green;
                }
                else
                {
                    countText.color = Color.yellow;
                }

            }
        }
    }

    void SelectIssues() {

        // temp
        int count = 0;
        int negCount = 0;
		foreach (var issue in issueToggleArray)
		{
			//issue.GetComponentInChildren<Text>().text = removeApos(jsonObj ["issues"] [i].ToString ());
			//print(issue.GetComponentInChildren<Text>().text);
			if (issue.GetComponentInChildren<Toggle>().isOn) {
				//print(issue.GetComponentInChildren<Text>().text.ToLower());
				selectedIssues.Add(issue.GetComponentInChildren<Text>().text.ToString());
                count++;

                countText.text = count.ToString();

            }
            else
            {
                negCount = count;
                negCount--;

                countText.text = negCount.ToString();
            }
		}

        if(count == 10)
        {
            loadScreen.SetActive(true);
            loadText.SetActive(true);

            StartCoroutine(delayLoading());
        }
        else
        {
            errorMessage.text = "Please select 10 issues...";
            errorBox.SetActive(true);
        }

		// temp

       
    }

	IEnumerator loadIssues()
	{
		yield return www;
		if (!string.IsNullOrEmpty (www.error)) {

            loadScreen.SetActive(false);
            loadText.SetActive(false);

            errorMessage.text = www.error;
			errorBox.SetActive(true);

           
        } else {
			print("loadIssuesReturn" + www.text);
			var jsonObj = JSON.Parse (www.text);
			//int arrayLength = jsonObj ["scoreboard"].Count;
			//print(jsonObj ["issues"][0]);
			// Loop through provinces and change image color
			int i = 0;
			foreach (var issue in issueToggleArray)
			{
				issue.GetComponentInChildren<Text>().text = removeApos(jsonObj [i]["topic"].ToString ());
				//print(issue.GetComponentInChildren<Text>().text);

				i++;
			}

            loadScreen.SetActive(false);
            loadText.SetActive(false);

        }

        
    }

	void getIssues()
	{
		print("Getting issues");

		//loadScreen.SetActive(false);
		//loadText.SetActive(false);

		loadIssues();
		string url = "http://localhost:3000/api/getIssues";
        

		www = new WWW (url);
        
		/*
         while(!www.isDone)
        {
            loadScreen.SetActive(true);
            loadText.SetActive(true);
        }

        */

        StartCoroutine (loadIssues());
	}



	string removeApos(string a) {
		return a.Replace('"', ' ').Trim();
	}
}
