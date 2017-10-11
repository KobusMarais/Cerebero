using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine;
using UnityEngine.SceneManagement;
//using System.Runtime.InteropServices;

public class NewGame : MonoBehaviour {

	//[DllImport("__Internal")]
	//private static extern string getAccessToken();

	public static string access_token;

	void Start()
	{
		Button btn = GetComponent<Button>();
		btn.onClick.AddListener(TaskOnClick);

        /*try   
		{  
			access_token = getAccessToken(); 
		}  
		catch  
		{
			access_token = "2";
		}*/
		

		access_token = "2";
		print ("accessToken: " + access_token);

		//access_token = "2";
		//if (access_token == null)
		//	access_token = "2";
	}

	void TaskOnClick()
	{
		SceneManager.LoadScene("NewGameScreen");
		Screen.fullScreen = true;
	}
}
