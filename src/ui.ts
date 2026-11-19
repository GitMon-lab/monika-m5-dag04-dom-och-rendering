// Dag 4: Funktioner som bygger sidans innehåll med DOM. Gör alla tester gröna på tests.html.
// Röda understrykningar tills du skrivit return är normalt. ratt.bild och ratt.beskrivning är
//  valfria (string | undefined): använd ?? "" för att få en text.
// Regel: använd createElement och textContent. Använd INTE innerHTML med data.
import { formateraPris } from './pris'
import type { Ratt } from './typer'

// 1. Bygger ett kort för en rätt och returnerar det (anropar inte append själv).
//    <article data-id="1">
//      <img src="..." alt="Illustration av kardemummabulle">

//      <h3>Kardemummabulle</h3>
//      <p>Beskrivning</p>
//      <p class="pris">35 kr</p>
//    </article>
export function skapaRattKort(ratt: Ratt): HTMLElement {
    // TODO
    const kort = document.createElement('article')
    kort.dataset.id = String(ratt.id)
    //kort.dataset.id = '1'

    const img = document.createElement('img')

    //null sammanslagning om värdet saknas blir det tom teststräng om bild finns visa annars tomt
    //nullish  img.src = ratt.bild ?? tenary
    //?:= välj mellan a och b
    // ?? reserbplan saknas värdet ta detta
    // ?. = finns elementet? gå vidare annars stanna
    img.src = ratt.bild ? ratt.bild : ''
    img.alt = `Illustration av ${ratt.namn} `

    const h3 = document.createElement('h3')
    h3.textContent = ratt.namn

    const beskrivning = document.createElement('p')
    beskrivning.textContent = ratt.beskrivning ?? ''

    const pris = document.createElement('p')
    pris.className = 'pris'
    pris.textContent = formateraPris(ratt.pris)

    kort.append(img, h3, beskrivning, pris)
    return kort
}

// 2. Töm containern och lägg in ett kort per rätt.
//    Är listan tom: visa <p class="tom">Inga rätter hittades.</p> istället.
export function visaMeny(container: HTMLElement, ratter: Ratt[]): void {
    // TODO
    //container.innerHtml = '';
    container.replaceChildren() //rensar alla noder och element, innerHtml fungerade inte
    if (ratter.length === 0) {
        const p = document.createElement('p')
        p.className = 'tom'
        p.textContent = 'Inga rätter hittades.'
        container.append(p)
        return
    }

    for (const ratt of ratter) {
        container.append(skapaRattKort(ratt))
    }
}

// 3. Sätt rubrikens text: "Meny (8 rätter)". Ett enda: "Meny (1 rätt)".
export function uppdateraRubrik(element: HTMLElement, antal: number): void {
    let rubrik: string = ''

    if (antal === 1) {
        element.textContent = `Meny (1 rätt)`
    } else {
        element.textContent = `Meny (${antal} rätter)`
    }

    // TODO
}

// 4. Markera EN rätt som dagens rätt: klassen "dagens" ska finnas på kortet med rätt
//    data-id, och inte på något annat kort. Anropas igen = markeringen flyttas.
export function markeraDagensRatt(container: HTMLElement, id: number): void {
    // TODO
    const allaKort = container.querySelectorAll('article')
    for (const kort of allaKort) {
        kort.classList.remove('dagens')
    }
    const valtKort = container.querySelector(`[data-id="${id}"]`)
    valtKort?.classList.add('dagens')
}
