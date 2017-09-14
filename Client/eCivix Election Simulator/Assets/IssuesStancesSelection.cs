using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class IssuesStancesSelection : MonoBehaviour {

    public GameObject loadScreen;
    public GameObject loadText;

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

        Issue1Text.text = "Issue 1 text";
        Issue2Text.text = "Issue 2 text";
        Issue3Text.text = "Issue 3 text";
        Issue4Text.text = "Issue 4 text";

        Button btn = startButton.GetComponent<Button>();
        btn.onClick.AddListener(SelectStances);

        issue1.onValueChanged.AddListener(issue1Slider);
        issue2.onValueChanged.AddListener(issue2Slider);
        issue3.onValueChanged.AddListener(issue3Slider);
        issue4.onValueChanged.AddListener(issue4Slider);
    }

    void issue1Slider(float value)
    {
        Issue1Stance.text = "Value: " + value;

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
        Issue2Stance.text = "Value: " + value;

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
        Issue3Stance.text = "Value: " + value;

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
        Issue4Stance.text = "Value: " + value;

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

    void SelectStances()
    {
        loadScreen.SetActive(true);
        loadText.SetActive(true);

        StartCoroutine(delayLoading());
    }

    IEnumerator delayLoading()
    {
        yield return new WaitForSeconds(2);

        SceneManager.LoadScene("MainScreen");
    }
}
