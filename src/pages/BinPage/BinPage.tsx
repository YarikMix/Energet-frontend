import {
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    FormControlLabel,
    Grid2,
    Typography,
} from "@mui/material";
import ItemCard from "src/widgets/ItemCard/ItemCard.tsx";
import { calculateTotalPrice } from "entities/Order/lib/calcTotalPrice.ts";
import { formatItemsCount } from "entities/Order/lib/formatItemsCount.ts";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { handleFetchDraftOrder } from "entities/Order/lib/slices/DraftOrderSlice.ts";
import { useAppDispatch } from "src/app/providers/StoreProvider/hooks/hooks.ts";

export const BinPage = () => {
    const dispatch = useAppDispatch();
    const order = useSelector((state) => state.orderReducer.order);

    useEffect(() => {
        console.log("handleFetchDraftOrder");
        dispatch(handleFetchDraftOrder());
    }, []);

    if (!order) {
        return <div>Loading</div>;
    }

    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "25px",
                    mb: 3,
                }}
            >
                <Typography variant="h4">Корзина</Typography>
                <span
                    style={{
                        marginBottom: "10px",
                        color: "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    {formatItemsCount(order)}
                </span>
            </Box>
            <Box>
                <Box mb={3}>
                    <FormControlLabel
                        label="Выбрать все"
                        control={<Checkbox />}
                    />
                </Box>
                <Box display="flex" gap="25px" alignItems="flex-start">
                    <Box sx={{ display: "flex", width: "calc(100% - 400px)" }}>
                        <Grid2
                            container
                            spacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 1, sm: 1, md: 1 }}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        >
                            {order.items.map((item) => (
                                <Grid2
                                    item
                                    key={item.id}
                                    size={{ xs: 2, sm: 3, md: 3 }}
                                >
                                    <ItemCard item={item} isBinPage={true} />
                                </Grid2>
                            ))}
                        </Grid2>
                    </Box>
                    <Box
                        sx={{ width: "400px", flexShrink: 1, display: "flex" }}
                    >
                        <Card
                            sx={{
                                width: "100%",
                                p: 3,
                                display: "flex",
                                flexDirection: "column",
                                gap: 5,
                            }}
                        >
                            <Typography variant="h4">Сумма заказа</Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="text.secondary">
                                    {formatItemsCount(order)}
                                </Typography>
                                <Typography color="text.secondary">
                                    {calculateTotalPrice(order)} ₽
                                </Typography>
                            </Box>
                            <Button variant="contained">
                                Перейти к оформлению
                            </Button>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};
