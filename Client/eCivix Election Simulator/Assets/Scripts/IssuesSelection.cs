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

		issueToggleArray = GameObject.FindGameObjectsWithTag("Issue");
		getIssues ();

        Button btn = start.GetComponent<Button>();
        btn.onClick.AddListener(SelectIssues);

        loadScreen.SetActive(false);
        loadText.SetActive(false);

        errorBox.SetActive(false);

        Button closeErrorbtn = closeError.GetComponent<Button>();
        closeErrorbtn.onClick.AddListener(closeErrorFun);
    }

    void closeErrorFun()
    {
        errorBox.SetActive(false);
    }

    IEnumerator delayLoading()
    {
        yield return new WaitForSeconds(2);

        SceneManager.LoadScene("StanceSelection");
    }

    void SelectIssues() {

        // temp
        int count = 0;
		foreach (var issue in issueToggleArray)
		{
			//issue.GetComponentInChildren<Text>().text = removeApos(jsonObj ["issues"] [i].ToString ());
			//print(issue.GetComponentInChildren<Text>().text);
			if (issue.GetComponentInChildren<Toggle>().isOn) {
				//print(issue.GetComponentInChildren<Text>().text.ToLower());
				selectedIssues.Add(issue.GetComponentInChildren<Text>().text.ToString());
                count++;
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

	void getIssues()
	{
		print("Getting issues");

		loadIssues();
		string url = "http://ecivix.org.za/api/getIssues";
        

		www = new WWW (url);
		StartCoroutine (loadIssues());
	}

	IEnumerator loadIssues()
	{
		yield return www;
		if (!string.IsNullOrEmpty (www.error)) {
            errorMessage.text = www.error;
            errorBox.SetActive(true);
        } else {
			//print(www.text);
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


		}
	}

	string removeApos(string a) {
		return a.Replace('"', ' ').Trim();
	}
}
