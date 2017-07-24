using System.Collections;
using System.Collections.Generic;
using UnityEngine.UI;
using UnityEngine.Events;
using UnityEngine;

public class ProvincesButtons : MonoBehaviour {

    public bool interactable = true;
    public float fadeSpeed = 10f;
    public UnityEvent onClick;
    public UnityEvent onMouseEnter;
    public UnityEvent onMouseExit;
    public UnityEvent whileMouseOver;
    public UnityEvent whileMouseAway;

    public Color normalColor;
    public Color pressedColor;
    public Color highlightedColor;
    public Color selectedColor;
    public Color disabledColor;

    private Button currentButton;

    private ColliderDetectMouseover filter;
    private Image targetImage;
    private bool mouseoverDone = false;


    // Use this for initialization
    void Start()
    {
        filter = GetComponent<ColliderDetectMouseover>();
        targetImage = GetComponent<Image>();
        currentButton = GetComponent<Button>();
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
                    targetImage.color = pressedColor;

                   if(currentButton.name == "NCButton")
                        print("You have clicked on the Northen Cape province");
                   else if (currentButton.name == "WCButton")
                        print("You have clicked on the Western Cape province");
                   else if(currentButton.name == "ECButton")
                        print("You have clicked on the Eastern Cape province");
                   else if(currentButton.name == "KZNButton")
                        print("You have clicked on the KwaZulu Natal province");
                   else if(currentButton.name == "FSButton")
                        print("You have clicked on the Free State province");
                   else if(currentButton.name == "GPButton")
                        print("You have clicked on the Gauteng province");
                   else if(currentButton.name == "NWButton")
                        print("You have clicked on the North West province");
                   else if(currentButton.name == "MPButton")
                        print("You have clicked on the Mpumalanga province");
                   else if (currentButton.name == "LPButton")
                        print("You have clicked on the Limpopo province");

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
