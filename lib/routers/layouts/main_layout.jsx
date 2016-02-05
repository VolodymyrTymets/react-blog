renderMainLayoutWith = function renderMainLayoutWith(components){
    ReactLayout.render(C.MainLayout , {
        header:< C.Header />,
        content: components,
        footer:<C.Footer />
    });
}