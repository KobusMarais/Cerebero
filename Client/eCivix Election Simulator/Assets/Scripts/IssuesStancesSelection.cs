using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using SimpleJSON;
using System.Text;

public class IssuesStancesSelection : MonoBehaviour {

	private WWW www;
    public GameObject loadScreen;
    public GameObject loadText;


    public GameObject errorBox;
    public Text errorMessage;
    public Button closeError;

    public Button startButton;
    public Slider issue1;
    public Slider issue2;
    public Slider issue3;
    public Slider issue4;
    public Slider issue5;
    public Slider issue6;
    public Slider issue7;
    public Slider issue8;
    public Slider issue9;
    public Slider issue10;

    public Text Issue1Text;
    public Text Issue2Text;
    public Text Issue3Text;
    public Text Issue4Text;
    public Text Issue5Text;
    public Text Issue6Text;
    public Text Issue7Text;
    public Text Issue8Text;
    public Text Issue9Text;
    public Text Issue10Text;

    public Text Issue1Stance;
    public Text Issue2Stance;
    public Text Issue3Stance;
    public Text Issue4Stance;
    public Text Issue5Stance;
    public Text Issue6Stance;
    public Text Issue7Stance;
    public Text Issue8Stance;
    public Text Issue9Stance;
    public Text Issue10Stance;


    // Use this for initialization
    void Start () {
        loadScreen.SetActive(false);
        loadText.SetActive(false);

		loadIssues ();

		Issue1Stance.text = "Stance: Center";
		Issue2Stance.text = "Stance: Center";
		Issue3Stance.text = "Stance: Center";
		Issue4Stance.text = "Stance: Center";
        Issue5Stance.text = "Stance: Center";
        Issue6Stance.text = "Stance: Center";
        Issue7Stance.text = "Stance: Center";
        Issue8Stance.text = "Stance: Center";
        Issue9Stance.text = "Stance: Center";
        Issue10Stance.text = "Stance: Center";



        //Issue1Text.text = "Issue 1 asdf";
        //Issue2Text.text = "Issue 2 text";
        //Issue3Text.text = "Issue 3 text";
        //Issue4Text.text = "Issue 4 text";

        Button btn = startButton.GetComponent<Button>();
        btn.onClick.AddListener(SelectStances);

        issue1.onValueChanged.AddListener(issue1Slider);
        issue2.onValueChanged.AddListener(issue2Slider);
        issue3.onValueChanged.AddListener(issue3Slider);
        issue4.onValueChanged.AddListener(issue4Slider);
        issue5.onValueChanged.AddListener(issue5Slider);
        issue6.onValueChanged.AddListener(issue6Slider);
        issue7.onValueChanged.AddListener(issue7Slider);
        issue8.onValueChanged.AddListener(issue8Slider);
        issue9.onValueChanged.AddListener(issue9Slider);
        issue10.onValueChanged.AddListener(issue10Slider);

        errorBox.SetActive(false);

        Button closeErrorbtn = closeError.GetComponent<Button>();
        closeErrorbtn.onClick.AddListener(closeErrorFun);
        
    }

    void closeErrorFun()
    {
        errorBox.SetActive(false);
    }

    void issue1Slider(float value)
    {
        //Issue1Stance.text = "Value: " + value;
		Issue1Stance.text = "Stance:";

        if(value == 1)
        {
            Issue1Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue1Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue1Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue1Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue1Stance.text += " Far Right";
        }
        
    }

    void issue2Slider(float value)
    {
		//Issue2Stance.text = "Value: " + value;
		Issue2Stance.text = "Stance:";

        if (value == 1)
        {
            Issue2Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue2Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue2Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue2Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue2Stance.text += " Far Right";
        }

    }

    void issue3Slider(float value)
    {
		//Issue3Stance.text = "Value: " + value;
		Issue3Stance.text = "Stance:";

        if (value == 1)
        {
            Issue3Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue3Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue3Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue3Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue3Stance.text += " Far Right";
        }

    }

    void issue4Slider(float value)
    {
		//Issue4Stance.text = "Value: " + value;
		Issue4Stance.text = "Stance:";

        if (value == 1)
        {
            Issue4Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue4Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue4Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue4Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue4Stance.text += " Far Right";
        }

    }
    void issue5Slider(float value)
    {
        //Issue1Stance.text = "Value: " + value;
        Issue5Stance.text = "Stance:";

        if (value == 1)
        {
            Issue5Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue5Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue5Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue5Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue5Stance.text += " Far Right";
        }

    }

    void issue6Slider(float value)
    {
        //Issue2Stance.text = "Value: " + value;
        Issue6Stance.text = "Stance:";

        if (value == 1)
        {
            Issue6Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue6Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue6Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue6Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue6Stance.text += " Far Right";
        }

    }

    void issue7Slider(float value)
    {
        //Issue3Stance.text = "Value: " + value;
        Issue7Stance.text = "Stance:";

        if (value == 1)
        {
            Issue7Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue7Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue7Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue7Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue7Stance.text += " Far Right";
        }

    }

    void issue8Slider(float value)
    {
        //Issue4Stance.text = "Value: " + value;
        Issue8Stance.text = "Stance:";

        if (value == 1)
        {
            Issue8Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue8Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue8Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue8Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue8Stance.text += " Far Right";
        }

    }
    void issue9Slider(float value)
    {
        //Issue1Stance.text = "Value: " + value;
        Issue9Stance.text = "Stance:";

        if (value == 1)
        {
            Issue9Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue9Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue9Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue9Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue9Stance.text += " Far Right";
        }

    }

    void issue10Slider(float value)
    {
        //Issue2Stance.text = "Value: " + value;
        Issue10Stance.text = "Stance:";

        if (value == 1)
        {
            Issue10Stance.text += " Far Left";
        }

        if (value == 2)
        {
            Issue10Stance.text += " Left";
        }

        if (value == 3)
        {
            Issue10Stance.text += " Center";
        }

        if (value == 4)
        {
            Issue10Stance.text += " Right";
        }

        if (value == 5)
        {
            Issue10Stance.text += " Far Right";
        }

    }

    void SelectStances()
    {
		setIssues ();
    }

    IEnumerator delayLoading()
    {
        yield return new WaitForSeconds(2);

        SceneManager.LoadScene("MainScreen");
    }

	void loadIssues()
	{
		//selectedIssues
		int i = 0;
		foreach (var issue in IssuesSelection.selectedIssues) {
			i++;
			switch (i) {
			case 1:
				Issue1Text.text = issue.ToString();
				break;
			case 2:
				Issue2Text.text = issue.ToString();
				break;
			case 3:
				Issue3Text.text = issue.ToString();
				break;
			case 4:
				Issue4Text.text = issue.ToString();
				break;
            case 5:
                Issue5Text.text = issue.ToString();
				break;
			case 6:
				Issue6Text.text = issue.ToString();
				break;
			case 7:
				Issue7Text.text = issue.ToString();
				break;
			case 8:
				Issue8Text.text = issue.ToString();
				break;
            case 9:
				Issue9Text.text = issue.ToString();
				break;
			case 10:
				Issue10Text.text = issue.ToString();
				break;
			}
		}
	}

	void setIssues()
	{
		print("Setting issues");

		setIssuesReturn();
		string url = "http://ecivix.org.za/api/setIssues";

		var requestString = "{'access_token':'123abc','issues':[" + createIssueStanceArray() + "]}";

		byte[] pData = Encoding.ASCII.GetBytes (requestString.ToCharArray ());

		www = new WWW (url, pData);
		StartCoroutine (setIssuesReturn());
	}

	IEnumerator setIssuesReturn()
	{
		yield return www;
		if (!string.IsNullOrEmpty (www.error)) {
            errorMessage.text = www.error;
            errorBox.SetActive(true);
        } else {
			loadScreen.SetActive(true);
			loadText.SetActive(true);

            

            StartCoroutine(delayLoading());
		}
	}

	string createIssueStanceArray(){
        string array = "{'issue':'" + IssuesSelection.selectedIssues[0].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue1Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[1].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue2Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[2].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue3Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[3].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue4Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[4].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue5Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[5].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue6Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[6].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue7Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[7].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue8Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[8].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue9Stance.text.ToString()) + "'}," +
            "{'issue':'" + IssuesSelection.selectedIssues[9].ToString().ToLower() + "', 'stance':'" + trimStanceText(Issue10Stance.text.ToString()) + "'}";

        return array;
	}

	string trimStanceText(string t){

		if (t == "Stance: Far Left")
			return "far left";
		if (t == "Stance: Left")
			return "left";
		if (t == "Stance: Center")
			return "centre";
		if (t == "Stance: Right")
			return "right";
		if (t == "Stance: Far Right")
			return "far right";

		return "";
	}
}
