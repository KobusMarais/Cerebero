using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class IssuesSelection : MonoBehaviour {

    public Button start;
    public GameObject loadScreen;
    public GameObject loadText;

    void Start () {
        Button btn = start.GetComponent<Button>();
        btn.onClick.AddListener(SelectIssues);

        loadScreen.SetActive(false);
        loadText.SetActive(false);
    }

    IEnumerator delayLoading()
    {
        yield return new WaitForSeconds(2);

        SceneManager.LoadScene("StanceSelection");
    }

    void SelectIssues() {
        loadScreen.SetActive(true);
        loadText.SetActive(true);

        StartCoroutine(delayLoading());
    }
}
