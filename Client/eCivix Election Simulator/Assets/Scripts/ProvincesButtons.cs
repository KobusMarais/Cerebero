﻿using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine;
using UnityEngine.EventSystems;

public class ProvincesButtons : MonoBehaviour
{

    public bool interactable = true;
    public float fadeSpeed = 10f;
    public UnityEvent onClick;
    public UnityEvent onMouseEnter;
    public UnityEvent onMouseExit;
    public UnityEvent whileMouseOver;
    public UnityEvent whileMouseAway;
    
    public Color pressedColor;

    public Text text;

    public static string provinceName;
    private Button currentButton;

    private ColliderDetectMouseover filter;
    //private Image targetImage;
    private bool mouseoverDone = false;

    private GameObject[] provinceArray;
    private GameObject[] provinceTextArray;

    // Use this for initialization
    void Start()
    {
        filter = GetComponent<ColliderDetectMouseover>();
        //targetImage = GetComponent<Image>();
        currentButton = GetComponent<Button>();
        provinceArray = GameObject.FindGameObjectsWithTag("Province");
        provinceTextArray = GameObject.FindGameObjectsWithTag("ProvinceText");
    }

    // Update is called once per frame
    void Update()
    {
        // TODO: Controller support
        // Detect mouse over and mouse click, and invoke events based on this, along with color changes as necessary.
        if (interactable)
        {
            if (filter.isMouseOver())
            {

                whileMouseOver.Invoke();
                if (Input.GetMouseButtonUp(0))
                {
                        onClick.Invoke();

                    /*
                    if (targetImage.color == pressedColor)
                    {
                        targetImage.color = Color.white;
                        text.color = Color.black;
                    }
                    else
                    {
                        targetImage.color = pressedColor;
                        text.color = Color.white;
                    }
                    */

                    // Loop through provinces and change image color
                    foreach (var prov in provinceArray)
                    {
                        if (prov.name == currentButton.name)
                        {
                            prov.GetComponent<Image>().color = pressedColor;
                        }
                        else
                        {
                            prov.GetComponent<Image>().color = Color.white;
                        }
                    }

                    // Loop through province text and change font color
                    foreach (var provText in provinceTextArray)
                    {
                        if (provText.name == text.name)
                        {
                            provText.GetComponent<Text>().color = Color.white;
                        }
                        else
                        {
                            provText.GetComponent<Text>().color = Color.black;
                        }
                    }

                    if (currentButton.name == "NCButton")
                    {
                        print("You have clicked on the Northen Cape province");
						provinceName = "northcape";
                    }
                    else if (currentButton.name == "WCButton")
                    {
                        print("You have clicked on the Western Cape province");
						provinceName = "westcape";
                    }
                    else if (currentButton.name == "ECButton")
                    {
                        print("You have clicked on the Eastern Cape province");
						provinceName = "eastcape";
                    }
                    else if (currentButton.name == "KZNButton")
                    {
                        print("You have clicked on the KwaZulu Natal province");
						provinceName = "kwazulunatal";
                    }
                    else if (currentButton.name == "FSButton")
                    {
                        print("You have clicked on the Free State province");
						provinceName = "freestate";
                    }
                    else if (currentButton.name == "GPButton")
                    {
                        print("You have clicked on the Gauteng province");
						provinceName = "gauteng";
                    }
                    else if (currentButton.name == "NWButton")
                    {
                        print("You have clicked on the North West province");
						provinceName = "northwest";
                    }
                    else if (currentButton.name == "MPButton")
                    {
                        print("You have clicked on the Mpumalanga province");
						provinceName = "mpumalanga";
                    }
                    else if (currentButton.name == "LPButton")
                    {
                        print("You have clicked on the Limpopo province");
						provinceName = "limpopo";
                    }
                }

                if (Input.GetMouseButton(0))
                {
                    //targetImage.color = selectedColor;
                }
                else //higlighted
                {
                }

                if (!mouseoverDone)
                {
                    mouseoverDone = true;
                    onMouseEnter.Invoke();
                }

            }
            else
            {

                if (mouseoverDone)
                {
                    mouseoverDone = false;
                    onMouseExit.Invoke();
                }

                whileMouseAway.Invoke();
                //targetImage.color = normalColor;
            }
        }
        else //disabled
        {
            //targetImage.color = disabledColor;
        }


    }
}