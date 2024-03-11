function Observer() {

    return (
        <div class="flex justify-center">
            <div class="whitespace-pre font-mono mb-5">
{`(new IntersectionObserver(callback, {
    rootMargin: ${"0px"},
    thresholds: ${"[1]"},
    rootElement: document.getElementById("")
})).observe(target);`}
            </div>
        </div>

    )
}

export default Observer