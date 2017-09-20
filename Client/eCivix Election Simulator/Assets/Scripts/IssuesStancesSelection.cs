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
	JSONNode jsonStanceObj;

    public Button startButton;
    public Slider issue1;
    public Slider issue2;
    public Slider issue3;
    public Slider issue4;

    public Text Issue1Text;
    public Text Issue2Text;
    public Text Issue3Text;
    public Text Issue4Text;

    public Text Issue1Stance;
    public Text Issue2Stance;
    public Text Issue3Stance;
    public Text Issue4Stance;


    // Use this for initialization
    void Start () {
        loadScreen.SetActive(false);
        loadText.SetActive(false);

		loadIssues ();
		loadStances ();

		//Issue1Stance.text = "Stance: Center";
		//Issue2Stance.text = "Stance: Center";
		//Issue3Stance.text = "Stance: Center";
		//Issue4Stance.text = "Stance: Center";


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
    }

    void issue1Slider(float value)
    {
        //Issue1Stance.text = "Value: " + value;
		//Issue1Stance.text = "Stance:";

        if(value == 1)
        {
            //Issue1Stance.text += " Far Left";
			Issue1Stance.text = jsonStanceObj [0] [0] [0] [0] [0];
        }

        if (value == 2)
        {
            //Issue1Stance.text += " Left";
			Issue1Stance.text = jsonStanceObj [0] [0] [0] [1] [0];
        }

        if (value == 3)
        {
            //Issue1Stance.text += " Center";
			Issue1Stance.text = jsonStanceObj [0] [0] [0] [2] [0];
        }

        if (value == 4)
        {
            //Issue1Stance.text += " Right";
			Issue1Stance.text = jsonStanceObj [0] [0] [0] [3] [0];
        }

        if (value == 5)
        {
            //Issue1Stance.text += " Far Right";
			Issue1Stance.text = jsonStanceObj [0] [0] [0] [4] [0];
        }
        
    }

    void issue2Slider(float value)
    {
		//Issue2Stance.text = "Value: " + value;
		//Issue2Stance.text = "Stance:";

        if (value == 1)
        {
            //Issue2Stance.text += " Far Left";
			Issue2Stance.text = jsonStanceObj [0] [1] [0] [0] [0];
        }

        if (value == 2)
        {
            //Issue2Stance.text += " Left";
			Issue2Stance.text = jsonStanceObj [0] [1] [0] [1] [0];
        }

        if (value == 3)
        {
            //Issue2Stance.text += " Center";
			Issue2Stance.text = jsonStanceObj [0] [1] [0] [2] [0];
        }

        if (value == 4)
        {
            //Issue2Stance.text += " Right";
			Issue2Stance.text = jsonStanceObj [0] [1] [0] [3] [0];
        }

        if (value == 5)
        {
            //Issue2Stance.text += " Far Right";
			Issue2Stance.text = jsonStanceObj [0] [1] [0] [4] [0];
        }

    }

    void issue3Slider(float value)
    {
		//Issue3Stance.text = "Value: " + value;
		//Issue3Stance.text = "Stance:";

        if (value == 1)
        {
            //Issue3Stance.text += " Far Left";
			Issue3Stance.text = jsonStanceObj [0] [2] [0] [0] [0];
        }

        if (value == 2)
        {
            //Issue3Stance.text += " Left";
			Issue3Stance.text = jsonStanceObj [0] [2] [0] [1] [0];
        }

        if (value == 3)
        {
            //Issue3Stance.text += " Center";
			Issue3Stance.text = jsonStanceObj [0] [2] [0] [2] [0];
        }

        if (value == 4)
        {
            //Issue3Stance.text += " Right";
			Issue3Stance.text = jsonStanceObj [0] [2] [0] [3] [0];
        }

        if (value == 5)
        {
            //Issue3Stance.text += " Far Right";
			Issue3Stance.text = jsonStanceObj [0] [2] [0] [4] [0];
        }

    }

    void issue4Slider(float value)
    {
		//Issue4Stance.text = "Value: " + value;
		//Issue4Stance.text = "Stance:";

        if (value == 1)
        {
            //Issue4Stance.text += " Far Left";
			Issue4Stance.text = jsonStanceObj [0] [3] [0] [0] [0];
        }

        if (value == 2)
        {
            //Issue4Stance.text += " Left";
			Issue4Stance.text = jsonStanceObj [0] [3] [0] [1] [0];
        }

        if (value == 3)
        {
            //Issue4Stance.text += " Center";
			Issue4Stance.text = jsonStanceObj [0] [3] [0] [2] [0];
        }

        if (value == 4)
        {
            //Issue4Stance.text += " Right";
			Issue4Stance.text = jsonStanceObj [0] [3] [0] [3] [0];
        }

        if (value == 5)
        {
            //Issue4Stance.text += " Far Right";
			Issue4Stance.text = jsonStanceObj [0] [3] [0] [4] [0];
        }

    }

    void SelectStances()
    {
		//print (createIssueStanceArray ());
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
			print (issue.ToString());
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
			}
		}
	}

	void loadStances() {
		jsonStanceObj = JSON.Parse (IssuesSelection.stancesArray);

		Issue1Stance.text = jsonStanceObj [0] [0] [0] [2] [0];
		Issue2Stance.text = jsonStanceObj [0] [1] [0] [2] [0];
		Issue3Stance.text = jsonStanceObj [0] [2] [0] [2] [0];
		Issue4Stance.text = jsonStanceObj [0] [3] [0] [2] [0];
		//print("xyz: " + jsonStanceObj[0][0][0][2][0].ToString());
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
			Debug.Log (www.error);
			print (www.error);
		} else {
			print(www.text);
			loadScreen.SetActive(true);
			loadText.SetActive(true);

			StartCoroutine(delayLoading());
		}
	}

	string createIssueStanceArray(){
		/*string array = "{'issue':'"+IssuesSelection.selectedIssues[0].ToString().ToLower()+"', 'stance':'"+ trimStanceText(Issue1Stance.text.ToString()) +"'}," +
			"{'issue':'"+IssuesSelection.selectedIssues[1].ToString().ToLower()+"', 'stance':'"+ trimStanceText(Issue2Stance.text.ToString()) +"'}," +
			"{'issue':'"+IssuesSelection.selectedIssues[2].ToString().ToLower()+"', 'stance':'"+ trimStanceText(Issue3Stance.text.ToString()) +"'}," +
			"{'issue':'"+IssuesSelection.selectedIssues[3].ToString().ToLower()+"', 'stance':'"+ trimStanceText(Issue4Stance.text.ToString()) +"'}";
		*/
		string array = "{'issue':'"+IssuesSelection.selectedIssues[0].ToString().ToLower()+"', 'stance':'"+ stance(issue1.value) +"'}," +
			"{'issue':'"+IssuesSelection.selectedIssues[1].ToString().ToLower()+"', 'stance':'"+ stance(issue2.value) +"'}," +
			"{'issue':'"+IssuesSelection.selectedIssues[2].ToString().ToLower()+"', 'stance':'"+ stance(issue3.value) +"'}," +
			"{'issue':'"+IssuesSelection.selectedIssues[3].ToString().ToLower()+"', 'stance':'"+ stance(issue4.value) +"'}";

		//print ("boom: " + array);
		return array;
	}

	string stance(float t){

		if (t == 1)
			return "far left";
		if (t == 2)
			return "left";
		if (t == 3)
			return "centre";
		if (t == 4)
			return "right";
		if (t == 5)
			return "far right";

		return "";
	}
}
